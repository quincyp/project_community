from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.conf import settings


from .models import Resource
from .forms import Resource_Form

def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def resources_index(request):

    # query string /?resource_type gets the string value stored into variable and passed to context
    resource_query = request.GET.get('resource_type', 'ALL')
    if request.method == 'POST':
        resource_form = Resource_Form(request.POST)
        if resource_form.is_valid():
            new_resource = resource_form.save()
            return redirect('resources_index')
    resources = Resource.objects.all()
    context = { 'resources': resources, 'GOOGLE_MAPS_API_KEY': settings.GOOGLE_MAPS_API_KEY, 'resource_query': resource_query }
    print(context)
    return render(request, 'resources/index.html', context)



def resources_detail(request, resource_id):
    resource = Resource.objects.get(id=resource_id)
    context = { 'resource': resource, 'GOOGLE_MAPS_API_KEY': settings.GOOGLE_MAPS_API_KEY }
    return render(request, 'resources/detail.html', context)

def about(request):
    return render(request, 'about.html')

def resources_new(request):
    resource_form = Resource_Form()
    context = { 'resource_form': resource_form}
    return render(request, 'resources/new.html', context)

def resources_edit(request, resource_id):
    resource = Resource.objects.get(id=resource_id)
    if request.method == 'POST':
        resource_form = Resource_Form(request.POST, instance=resource)
        if resource_form.is_valid():
            resource_form.save()
            return redirect('resources_detail', resource_id=resource.id)

    resource_form = Resource_Form(instance=resource)
    context = { 'resource': resource, 'resource_form': resource_form}
    return render(request, 'resources/edit.html', context)

def resources_delete(request, resource_id):
    resource = Resource.objects.get(id=resource_id)
    resource.delete()
    return redirect('resources_index')
