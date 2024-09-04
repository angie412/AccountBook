from django.shortcuts import render
from django.views import View
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
# user modle library (login ect .. )
from validate_email import validate_email 
from django.contrib import messages
class UsernameValidationView(View):
    def post(self, request):
        data = json.loads(request.body) 
        #get json for user and save dictionary 

        username = data['username']

        if not str(username).isalnum():
            return JsonResponse({'username_error':'invalid characters in name'}, status = 400) 
        if User.objects.filter(username=username).exists():
            return JsonResponse({'username_error' : 'username already exists. choose another one'})
        # object : 데이터 베이스 쿼리 수행할수 있는 interface 제공

        return JsonResponse({'username_valid': True})


class EmailValidationView(View) :
    def post(self, request):
        data = json.loads(request.body)
        email = data['email']
        if not validate_email(email):
            return JsonResponse({'email_error' : 'Email is invalid' }, status=400)
        if User.objects.filter(email = email).exists():
            return JsonResponse({'email_error' : "email in use, choose another one" })
        return JsonResponse({"email_valid" : True})

        



class RegisterationView(View):
    def get(self, request):
        return render(request, "authentication/register.html")
    
    def post(self, request):
        #GET USER DATA
        #VALIDATE
        # create a user account

        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']

        context = {
            'fieldValues' :request.POST
        }

        if not User.objects.filter(username = username).exists():
            if not User.objects.filter(email = email).exists():

                if len(password) < 6 :
                    messages.error(request, "password too short")
                    return render(request,"authentication/register.html",context)

                user = User.objects.create_user(username = username, email = email)
                user.set_password(password)
                user.save()
                # https://docs.djangoproject.com/en/5.1/ref/contrib/auth/
                messages.success(request,'Account successfully created')
                return render(request,"authentication/register.html")
                

        return render(request,"authentication/register.html")