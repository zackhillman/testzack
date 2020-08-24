from django.urls import path
from . import views


urlpatterns = [
	path('register/', views.registerPage, name="register"),
	path('login/', views.loginPage, name="login"),  
	path('logout/', views.logoutUser, name="logout"),

	path('', views.home, name="home"),
	path('get_articles', views.get_articles, name="get_articles"),
	path('get_articles_all', views.get_articles_table, name="get_articles_all"),
	path('get_stored_categories', views.get_stored_categories, name="get_stored_categories"),
	path('populate_categories', views.populate_categories, name="populate_categories"),
	path('store_email', views.store_email, name="store_email"),

]