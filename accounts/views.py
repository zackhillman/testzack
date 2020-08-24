from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from datetime import date

from django.contrib import messages
from .models import *
from .forms import  CreateUserForm
import pandas as pd
import datetime

import arxiv
import urllib.request as libreq
import feedparser
from io import StringIO
from pathlib import Path
import os
import argparse
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction import stop_words
import numpy as np
from scipy.sparse.csr import csr_matrix
import glob


def registerPage(request):
	if request.user.is_authenticated:
		return redirect('home')
	else:
		form = CreateUserForm()
		if request.method == 'POST':
			form = CreateUserForm(request.POST)
			if form.is_valid():
				form.save()
				user = form.cleaned_data.get('username')
				messages.success(request, 'Account was created for ' + user)

				return redirect('login')


		context = {'form':form}
		return render(request, 'accounts/register.html', context)

def loginPage(request):
	if request.user.is_authenticated:
		return redirect('home')
	else:
		if request.method == 'POST':
			username = request.POST.get('username')
			password =request.POST.get('password')

			user = authenticate(request, username=username, password=password)

			if user is not None:
				login(request, user)
				return redirect('home')
			else:
				messages.info(request, 'Username OR password is incorrect')

		context = {}
		return render(request, 'accounts/login.html', context)

def logoutUser(request):
	logout(request)
	return redirect('login')



# Preprocess the text into bullets
def prePro(text):
	cleanedText = text
	cleanedText = re.sub(r'\n', ' ', cleanedText)  # Get rid of new lines replace with spaces
	cleanedText = re.sub(r'(\(([^)^(]+)\))', '',
						 cleanedText)  # removes everything inside of parentheses, have to re-run for nested
	cleanedText = re.sub(r'(\[([^]^[]+)\])', '', cleanedText)  # removes everything inside of square brackets
	cleanedText = re.sub(r'(\{([^}^{]+)\})', '', cleanedText)  # removes everything inside of curly brackets
	cleanedText = re.sub(r'[^\w^\s^.]', ' ',
						 cleanedText)  # Remove all characters not [a-zA-Z0-9_] excluding spaces and periods
	# cleanedText = re.sub(r'\d','', cleanedText) #Remove all numbers
	cleanedText = re.sub(r'(\. ){2,}', '. ', cleanedText).strip()  # Replace all multiple period spaces with one
	return cleanedText

def query(the_date, Category, category_obj):
	base_url = 'http://export.arxiv.org/api/query?'
	search_query = Category
	query = 'search_query=%s&max_results=30&sortBy=submittedDate&sortOrder=descending' % (search_query)
	feedparser._FeedParserMixin.namespaces['http://a9.com/-/spec/opensearch/1.1/'] = 'opensearch'
	feedparser._FeedParserMixin.namespaces['http://arxiv.org/schemas/atom'] = 'arxiv'
	with libreq.urlopen(base_url + query) as url:
		response = url.read()
	feed = feedparser.parse(response)
	date = the_date
	corpus_entry = []
	exists = False
	count = 0
	for entry in feed.entries:
		# print (entry.title + " " + entry.published + "\n")
		if entry.published[0:10] == date:
			corpus_entry.append(entry)
			exists = True
	# If date does not exist just returns most recent articles
	if exists == False:
		if count == 0:
			count = 1
			if entry.published[0:10] == date:
				return False
			else:
				date = entry.published[0:10]
		if entry.published[0:10] == date:
			corpus_entry.append(entry)

	for paper in corpus_entry:
		paper.summary = prePro(paper.summary.lower())
	stop_Words = stop_words.ENGLISH_STOP_WORDS
	# Dictionary here
	corpusSumm = []
	for paper in corpus_entry:
		corpusSumm.append(paper.summary)
	cv = CountVectorizer(max_df=.85, stop_words=stop_Words)
	word_count_vector = cv.fit_transform(corpusSumm)
	tfidf_transformer = TfidfTransformer(smooth_idf=True, use_idf=True)
	tfidf_transformer.fit(word_count_vector)

	feature_names = cv.get_feature_names()
	i = 0
	for paper in corpus_entry:
		i += 1
		tf_idf_vector = tfidf_transformer.transform(cv.transform([paper.summary]))
		sorted_items = sort_coo(tf_idf_vector.tocoo())
		keywords = extract_topn_from_vector(feature_names, sorted_items)
		top3_sentences = []
		top3_scores = []
		top3_breakdown = []
		for sentence in paper.summary.split("."):
			# how many scores are higher in top3 than this sentence, if all 3, delete and replace, otherwise delete lowest
			higherScores = 0
			sentenceTotal = 0
			theSentence = []
			breakdown = []
			index = 0
			# keep track of words / sentence to get average score
			word_count = 0
			for word in sentence.split(" "):
				# Add up all of the tf_idf scores
				if word.lower() in keywords:
					sentenceTotal = sentenceTotal + keywords[word.lower()]
					breakdown.append(keywords[word.lower()])
				# Average by word
				theSentence.append(word.lower())
				breakdown.append("0")
				word_count = word_count + 1
			sentenceTotal = sentenceTotal / word_count
			min_score = 1000
			# print (theSentence,sentenceTotal,word_count)
			# get index of min score and append if should
			if top3_sentences:
				# print (top3_scores)
				if len(top3_scores) == 3:
					for idx, score in enumerate(top3_scores):
						if score > sentenceTotal:
							higherScores = higherScores + 1
						elif score < min_score:
							index = idx
							min_score = score
					if higherScores < 3:
						del top3_sentences[index]
						del top3_scores[index]
						top3_sentences.append(sentence)
						top3_scores.append(sentenceTotal)
						top3_breakdown.append(breakdown)

				else:
					top3_sentences.append(sentence)
					top3_scores.append(sentenceTotal)
					top3_breakdown.append(breakdown)
			else:
				top3_sentences.append(sentence)
				top3_scores.append(sentenceTotal)
				top3_breakdown.append(breakdown)

		three_sentences = []
		for sentence in top3_sentences:
			if sentence == '':
				print(sentence)
			else:
				if sentence[0] == ' ':
					print(sentence[1:] + "\n")
				else:
					print(sentence + "\n")
			three_sentences.append(sentence)

		obj = Articles(title=paper.title, link=paper.link,sentence=three_sentences, category=category_obj, date=date)
		obj.save()
		print(i)
		print("\n" + paper.title + "\n")
		print("Category: " + Category + "\n" + "Date: " + date + "\n")

# For use in tf-idf
def extract_topn_from_vector(feature_names, sorted_items):
	score_vals = []
	feature_vals = []
	for idx, score in sorted_items:
		fname = feature_names[idx]
		# keep track of feature name and its corresponding score
		score_vals.append(round(score, 3))
		feature_vals.append(fname)
	# create a tuples of feature,score
	# results = zip(feature_vals,score_vals)
	results = {}
	for idx in range(len(feature_vals)):
		results[feature_vals[idx]] = score_vals[idx]

	return results

# for use in tfidf
def sort_coo(coo_matrix):
	tuples = zip(coo_matrix.col, coo_matrix.data)
	return sorted(tuples, key=lambda x: (x[1], x[0]), reverse=True)

# Return Abstracts to pass them on to split abstract and the rest, if passed a boolean i.e. True, loop through all categories



def home(request):
	print('---------home-----------')
	context = {}
	return render(request, 'accounts/index.html', context)


def get_articles_table(request):
	articles = Articles.objects.all().values()

	print(len(articles))
	return JsonResponse({"articles": list(articles)})

@csrf_exempt
def get_stored_categories(request):
	data = {}
	for main_category in ['Astrophysics', 'Condensed Matter', 'Physics', 'Mathematics', 'Nonlinear Sciences','Computer Science',
						  		'Quantitative Biology','Statistics', 'Electrical Engineering and System Sciences', 'Ecnomics']:
		articles = Categories.objects.filter(main_category=main_category).values('slug','category')
		data[main_category] = list(articles)
	return JsonResponse({"articles": data})


@csrf_exempt
def get_articles(request):

	if request.method == 'POST':
		print('POST Request body data')
		data = request.body.decode('utf-8')
		data = json.loads(data)
		recent = data['recent']
		slug = data['slug']

		if recent == 'true':
			the_date = date.today()
		else:
			the_date = data['date']

		print(the_date, slug)
		category_obj = Categories.objects.get(slug=slug)
		articles = Articles.objects.filter(category=category_obj).filter(date=the_date).values()[:30]

		if len(articles) == 0:
			print('IF category obj ',category_obj.category)
			try:
				query(the_date, slug, category_obj)
				articles = Articles.objects.filter(category=category_obj).filter(date=the_date).values()[:30]

			except:
				print('except')
				articles = Articles.objects.filter(category=category_obj).order_by('date').values()[:30]

		print(len(articles))
		return JsonResponse({"articles": list(articles)})
	return JsonResponse({'data':'empty'})


def populate_categories(request):
	df = pd.read_excel('Categories.xlsx')
	for index, row in df.iterrows():
		if row['Column1'] is not np.nan:

			if 'astro' in row['Column1']:
				main_category = 'Astrophysics'
			elif 'cond' in row['Column1']:
				main_category = 'Condensed Matter'
			elif 'physics' in row['Column1']:
				main_category = 'Physics'
			elif 'math' in row['Column1']:
				main_category = 'Mathematics'
			elif 'nlin' in row['Column1']:
				main_category = 'Nonlinear Sciences'
			elif 'cs' in row['Column1']:
				main_category = 'Computer Science'
			elif 'q-bio' in row['Column1']:
				main_category = 'Quantitative Biology'
			elif 'stat' in row['Column1']:
				main_category = 'Statistics'
			elif 'eess' in row['Column1']:
				main_category = 'Electrical Engineering and System Sciences'
			elif 'econ' in row['Column1']:
				main_category = 'Ecnomics'

			obj = Categories(main_category=main_category, slug=str(row['Column1']).strip(), category=str(row['Column2']).strip())
			obj.save()
	print('Data has been generated for Categories.xlsx')

@csrf_exempt
def store_email(request):
	if request.method == 'POST':
		data = request.body.decode('utf-8')
		data = json.loads(data)
		email = data['email']
		print('email ',email)
		obj=Subscribe(email=email)
		obj.save()
		return JsonResponse({'email stored ':email})

	return JsonResponse({'email stored ':'0'})