from django.shortcuts import render, redirect
from django.http import HttpResponse


from .models import Resource
from .forms import Resource_Form

# Create your views here.
def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def resources_index(request):
    # REVIEW: POST request not working
    print("================================")
    print("here")
    print("================================")
    if request.method == 'POST':
        resource_form = Resource_Form(request.POST)
        if resource_form.is_valid():
            new_resource = resource_form.save()
            return redirect('resources_index')
    resources = Resource.objects.all()
    context = { 'resources': resources }
    return render(request, 'resources/index.html', context)

def resources_detail(request, resource_id):
    resource = Resource.objects.get(id=resource_id)
    context = { 'resource': resource }
    return render(request, 'resources/detail.html', context)

def about(request):
    return render(request, 'about.html')

def resources_new(request):
    # REVIEW: Form renders, POST action not working
    resource_form = Resource_Form()
    context = { 'resource_form': resource_form}
    return render(request, 'resources/new.html', context)