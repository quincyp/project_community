from django.db import models

# Create your models here.

class Resource(models.Model):
    name = models.CharField(max_length=120)

    address1 = models.CharField(max_length=120)
    address2 = models.CharField(max_length=120)
    address3 = models.CharField(max_length=120)
    city = models.CharField(max_length=120)
    state = models.CharField(max_length=2)
    zip_code = models.CharField(max_length=5)

    phone = models.CharField(max_length=12)

    website = models.CharField(max_length=512)
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
