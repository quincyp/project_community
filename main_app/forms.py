from django import forms
from .models import Resource

class Resource_Form(forms.ModelForm):
    class Meta:
        model = Resource
        labels = {'address1': 'Address', 'address2': '', 'address3': ''}
        fields = [
            'resource_type',
            'name',
            'phone',
            'address1',
            'address2',
            'address3',
            'city',
            'state',
            'zip_code',
            'website',
            'description',
            # 'verified',
        ]