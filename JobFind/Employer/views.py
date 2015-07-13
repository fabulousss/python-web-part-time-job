from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib import auth 
from django.http import HttpResponse
from Employer.models import *
# Create your views here.
def userCenter(request):
  # detection user is login or not
  userinfo = request.user
  if not userinfo.is_authenticated():
    return redirect('/login')
  else:
    employer = Employer.objects.get(user=userinfo)
    joblist = Job_info.objects.filter(employer=employer)
    return render(request,'employerPage.html',{'joblist':joblist})