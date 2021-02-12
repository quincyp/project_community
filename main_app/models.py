from django.db import models

# Create your models here.

class Resource(models.Model):
    name = models.CharField(max_length=120)

    address1 = models.CharField(max_length=120, blank=True)
    address2 = models.CharField(max_length=120, blank=True)
    address3 = models.CharField(max_length=120, blank=True)
    city = models.CharField(max_length=120, blank=True)
    state = models.CharField(max_length=2, blank=True)
    zip_code = models.CharField(max_length=5, blank=True)

    phone = models.CharField(max_length=12, blank=True)

    website = models.CharField(max_length=512, blank=True)
    description = models.CharField(max_length=1024)
    verified = models.BooleanField(default=False)

    RESOURCES_LIST = [
        ('HEAL', 'Healthcare'),
        ('HOUS', 'Housing/Shelter'),
        ('FOOD', 'Food'),
        ('EMPL', 'Employment'),
        ('EDUC', 'Education'),
        ('UTIL', 'Utility/Financial'),
        ('TRAN', 'Transportaion'),
        ('DISA', 'Disability'),
        ('DOME', 'Domestic Violence'),
    ]
    resource_type = models.CharField(
        max_length=4,
        choices=RESOURCES_LIST,
        default=RESOURCES_LIST[0][0]
    )

    def __str__(self):
        return f"{self.name}"
