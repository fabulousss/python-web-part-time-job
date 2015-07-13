from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib import auth 
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from Employer.models import *

import simplejson
from django.core import serializers

def home(request):
  citylist = City.objects.all()
  joblist = Job_info.objects.all()
  return render(request,'home.html',{'citylist':citylist,'joblist':joblist})

@csrf_exempt
def login(request):
  if request.method == 'GET':
    return render(request,'login.html')
  elif request.method == 'POST':
    username = request.POST.get('username','')
    password = request.POST.get('password','')
    print username,password
    findByName = User.objects.filter(username=username)
    if findByName:
      user = auth.authenticate(username=username,password=password)
      if user is not None and user.is_active:
        auth.login(request,user)
        data = {'status':'1','url':'home'}
        return HttpResponse(simplejson.dumps(data),content_type="application/json")
      else:
        data = {'status':'0','errortype':'password'}
        return HttpResponse(simplejson.dumps(data),content_type="application/json")
    else:
      data = {'status':'0','errortype':'username'}
      return HttpResponse(simplejson.dumps(data),content_type="application/json")

def loginout(request):
  auth.logout(request)
  return redirect('/home')

@csrf_exempt
def register(request):
  response = HttpResponse()
  if request.method == 'GET':
    citylist = City.objects.all()
    return render(request,'register.html',{'citylist':citylist})
  elif request.method == 'POST':
    username = request.POST.get('username','')
    email = request.POST.get('email','')
    password = request.POST.get('password','')
    employername = request.POST.get('employername','')
    state = request.POST.get('state','')
    addresscontent = request.POST.get('addresscontent','')
    telephone1 = request.POST.get('telephone1','')
    print username,email,password,employername,state,addresscontent,telephone1

    user = User.objects.create_user(username,email,password)
    user.is_staff = True
    user.save()
    print type(user)

    statefind = State.objects.get(id=state)
    print type(statefind.city)

    address = Address(city=statefind.city,state=statefind,content=addresscontent)
    address.save()
    print address

    employer = Employer(user=user,name=employername,address=address,telephone1=telephone1,telephone2=telephone1)
    employer.save()
    print employer

    data = 'register success'
    response.write(data)
    return response

@csrf_exempt
def check(request):
  response = HttpResponse();
  if 'name' in request.POST:
    name = request.POST.get('name','')
    print name
    data = User.objects.filter(username=name)
    if data:
      message = 'no'
    else:
      message = 'yes'
    response.write(message)
  if 'email' in request.POST:
    email = request.POST.get('email','')
    data = User.objects.filter(email=email)
    if data:
      message = 'no'
    else:
      message = 'yes'
    response.write(message)
  return response

@csrf_exempt
def findstate(request):
  response = HttpResponse()
  if 'city' in request.POST:
    city_id = request.POST['city']
    city = City.objects.filter(id=city_id)
    statelist = State.objects.filter(city=city)
    data = serializers.serialize("json", statelist,ensure_ascii=False)
    return HttpResponse(data,content_type="application/json")
  else:
    message = 'failed'
    response.write(message)
    return response