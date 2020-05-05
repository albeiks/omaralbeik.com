# Generated by Django 3.0.3 on 2020-05-05 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=140)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(blank=True, max_length=55, null=True)),
                ('country', models.CharField(blank=True, max_length=74, null=True)),
                ('city', models.CharField(blank=True, max_length=55, null=True)),
                ('subject', models.CharField(max_length=255)),
                ('message', models.TextField()),
                ('is_read', models.BooleanField(default=False)),
                ('date_created', models.DateField(auto_now_add=True)),
            ],
            options={
                'ordering': ['is_read', '-date_created', 'email'],
            },
        ),
    ]
