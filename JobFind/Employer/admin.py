from django.contrib import admin
from Employer.models import Employer,Job_info,Address,City,State

class EmployerAdmin(admin.ModelAdmin):
  list_display = ('user','name','address','telephone1')
class Job_infoAdmin(admin.ModelAdmin):
  list_display = ('employer','discrebtion','total_num','img_file')
# Register your models here.
admin.site.register(Employer,EmployerAdmin)
admin.site.register(Job_info)
admin.site.register(Address)
admin.site.register(City)
admin.site.register(State)