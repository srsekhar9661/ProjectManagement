from django.contrib import admin
from api import models as m

admin.site.register(m.Task)
admin.site.register(m.Comment)
admin.site.register(m.Attachment)

