from django.shortcuts import render
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# 1. View to show your portfolio homepage
def index(request):
    return render(request, 'core/index.html')

# 2. View to show the separate contact page (if you use it)
def contact_page(request):
    return render(request, 'core/contact.html')

# 3. The API that receives the form data and sends the email
@csrf_exempt
def send_email_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            subject = data.get('subject')
            message = data.get('message')

            # Compose the email
            full_message = f"New message from Portfolio!\n\nName: {name}\nEmail: {email}\n\nMessage:\n{message}"
            
            send_mail(
                f"Portfolio Contact: {subject}", # Email Subject
                full_message,                    # Email Body
                'kunalnandiwadekar2003@gmail.com', # From Email
                ['kunalnandiwadekar2003@gmail.com'], # To Email (You)
                fail_silently=False,
            )
            return JsonResponse({'status': 'success', 'message': 'Email sent!'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)