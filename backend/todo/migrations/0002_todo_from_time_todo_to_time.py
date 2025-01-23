# Generated by Django 5.1.5 on 2025-01-22 16:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='from_time',
            field=models.DateTimeField(blank=True, help_text='The start time of the task', null=True, verbose_name='Start Time'),
        ),
        migrations.AddField(
            model_name='todo',
            name='to_time',
            field=models.DateTimeField(blank=True, help_text='The end time of the task', null=True, verbose_name='End Time'),
        ),
    ]
