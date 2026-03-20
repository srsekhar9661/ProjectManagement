# import os
# import django

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "pro_management.settings")

# django.setup()

# from core.models import Pricing

# pr, c = Pricing.objects.get_or_create(
#     name='Free',
#     price= 0,
#     is_paid=False,
#     currency_symbol='₹',
#     plan='Free tier'
# )

# if c:
#     print(f"New Pricing object created")
# else:
#     print(f"Pricing instance alrteady exists")