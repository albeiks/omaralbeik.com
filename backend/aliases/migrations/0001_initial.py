# Generated by Django 3.0.3 on 2020-05-05 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Redirect',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('source', models.CharField(max_length=255, unique=True)),
                ('destination', models.SlugField(max_length=255, unique=True)),
            ],
            options={
                'ordering': ['source', 'destination'],
                'unique_together': {('source', 'destination')},
            },
        ),
    ]