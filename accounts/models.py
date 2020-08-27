from django.db import models
from django.contrib.auth.models import User

import json

# Create your models here.


class Categories(models.Model):
	main_category = models.CharField(max_length=200)
	slug = models.CharField(max_length=200)
	category = models.CharField(max_length=200)

	def __str__(self):
		return self.main_category


class AlreadyScraped(models.Model):
	date = models.DateField()
	slug = models.CharField(max_length=200)


class Articles(models.Model):
	title = models.CharField(max_length=200, null=True)
	link = models.CharField(max_length=200, null=True)
	sentence = models.CharField(max_length=200, null=True)
	category = models.ForeignKey(Categories, on_delete=models.DO_NOTHING)
	date = models.DateField()
	def __str__(self):
		return self.category


class Subscribe(models.Model):
	email = models.CharField(max_length=200)

	def __str__(self):
		return self.email


