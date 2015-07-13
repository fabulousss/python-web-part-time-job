from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'JobFind.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^home/','Tourist.views.home'),
    url(r'^login/','Tourist.views.login'),
    url(r'^loginout/','Tourist.views.loginout'),
    url(r'^register/','Tourist.views.register'),
    url(r'^userCenter/','Employer.views.userCenter'),

    url(r'^check/$','Tourist.views.check'),
    url(r'^city_find','Tourist.views.findstate'),
    url(r'^admin/', include(admin.site.urls)),
) + static(settings.STATIC_URL)