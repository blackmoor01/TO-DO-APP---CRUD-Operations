# Generated by Django 5.1.5 on 2025-01-22 16:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0002_todo_from_time_todo_to_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='task_date',
            field=models.DateField(default='2025-01-01', help_text='The date the task is expected to commence.', verbose_name='Expected Task Date'),
        ),
        migrations.AlterField(
            model_name='todo',
            name='from_time',
            field=models.TimeField(blank=True, help_text='The start time of the task', null=True, verbose_name='Start Time'),
        ),
        migrations.AlterField(
            model_name='todo',
            name='to_time',
            field=models.TimeField(blank=True, help_text='The end time of the task', null=True, verbose_name='End Time'),
        ),
    ]
