from django.db import models
from django.contrib.auth.models import User

import json

# Create your models here.

class Articles(models.Model):
	sentence = models.CharField(max_length=200, null=True)
	category = models.CharField(max_length=200, null=True)
	date = models.DateField()

	def __str__(self):
		return self.category



