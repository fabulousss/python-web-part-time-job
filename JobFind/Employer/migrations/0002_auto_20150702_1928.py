# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.conf import settings
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('Employer', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='job_info',
            old_name='dicrebtion',
            new_name='discrebtion',
        ),
        migrations.RemoveField(
            model_name='address',
            name='employer',
        ),
        migrations.AddField(
            model_name='employer',
            name='address',
            field=models.OneToOneField(to='Employer.Address'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='employer',
            name='user',
            field=models.OneToOneField(to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='job_info',
            name='img_file',
            field=models.FileField(null=True, upload_to=b'staticurl'),
            preserve_default=True,
        ),
    ]
