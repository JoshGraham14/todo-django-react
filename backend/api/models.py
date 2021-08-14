from django.db import models


class TodoItem(models.Model):
    content = models.CharField(max_length=255)
    completed = models.BooleanField(default=False, blank=True, null=True)

    def __str__(self):
        return self.content
