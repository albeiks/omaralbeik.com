# Generated by Django 3.0.3 on 2020-05-10 13:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('aliases', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Redirect',
            new_name='Alias',
        ),
    ]