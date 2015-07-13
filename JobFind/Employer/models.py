from django.db import models
from django.contrib.auth.models import User

class City(models.Model):
  name = models.CharField(max_length=20)
  def __unicode__(self):
    return self.name

class State(models.Model):
  city = models.ForeignKey(City)
  name = models.CharField(max_length=50)
  def __unicode__(self):
    return self.name
 
class Address(models.Model):
  city = models.ForeignKey(City)
  state = models.ForeignKey(State)
  content = models.CharField(max_length=100)
  def __unicode__(self):
    return self.content

class Employer(models.Model):
  user = models.OneToOneField(User)
  name = models.CharField(max_length=100)
  address = models.OneToOneField(Address)
  telephone1 = models.CharField(max_length=11)
  telephone2 = models.CharField(max_length=11)
  def __unicode__(self):
    return self.name

class Job_info(models.Model):
  employer = models.ForeignKey(Employer)
  discrebtion = models.CharField(max_length=100)
  total_num = models.IntegerField()
  img_file = models.ImageField(upload_to='image',null=True)
  def __unicode__(self):
    return self.discrebtion