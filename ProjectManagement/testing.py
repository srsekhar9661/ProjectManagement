if __name__ == '__main__':
    print('This is for the testing of mail sending to the users')
    import django
    import os

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pro_management.settings')
    django.setup()
    from api.models import Project

    from django.conf import settings
    from django.core.mail import send_mail

    send_mail(
        subject='Welcome to Project Management Tool',
        message='This is a project management tool for the developers and freelancers to handle their projects.',
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=['srsekhar1499@gmail.com'],
        fail_silently=True
    )