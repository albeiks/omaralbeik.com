# Generated by Django 3.0.3 on 2020-05-12 21:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='date_modified',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
