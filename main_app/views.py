from django.shortcuts import render
from django.http import HttpResponse


from .models import Resource

# Create your views here.
def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def resources_index(request):
    resources = Resource.objects.all()
    context = { 'resources': resources }
    return render(request, 'resources/index.html', context)