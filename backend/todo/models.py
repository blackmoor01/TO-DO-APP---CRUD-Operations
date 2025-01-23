from django.db import models
from django.core.exceptions import ValidationError
from datetime import datetime


class Todo(models.Model):
    body = models.CharField(max_length=300)
    completed = models.BooleanField(default=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    from_time = models.TimeField(
        verbose_name="Start Time", 
        help_text="The start time of the task", 
        null=True, 
        blank=True
    )
    to_time = models.TimeField(
        verbose_name="End Time", 
        help_text="The end time of the task", 
        null=True, 
        blank=True
    )
    task_date = models.DateField(
        verbose_name="Expected Task Date", 
        help_text="The date the task is expected to commence.", 
        null=False, 
        blank=False,
        default="2025-01-01"
    )

    def clean(self):
        super().clean()  # Call the parent class's clean method

        # Validate if both times are provided
        if self.from_time and self.to_time:
            if self.from_time >= self.to_time:
                raise ValidationError("Start Time must be earlier than end End Time.")
            

    # Check if times are logically associated with the task_date
        if self.task_date:
            today = datetime.now().date()
            if self.task_date < today:
                raise ValidationError("The date cannot be in the past.")

    def __str__(self):
        return self.body
