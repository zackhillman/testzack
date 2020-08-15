from django.urls import path
from . import views


urlpatterns = [
	path('register/', views.registerPage, name="register"),
	path('login/', views.loginPage, name="login"),  
	path('logout/', views.logoutUser, name="logout"),

	path('', views.home, name="home"),
	path('get_articles_all', views.get_articles_table, name="get_articles_all"),



]