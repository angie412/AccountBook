from django.shortcuts import render

# Create your views here.

def index(request) :
    return render(request, 'expenses/index.html')
# request.'render 할 템플릿'

def add_expense(request):
    return render(request, 'expenses/add_expenses.html')