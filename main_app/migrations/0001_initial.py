# Generated by Django 3.1.6 on 2021-02-05 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Resource',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('address1', models.CharField(max_length=120)),
                ('address2', models.CharField(max_length=120)),
                ('address3', models.CharField(max_length=120)),
                ('city', models.CharField(max_length=120)),
                ('state', models.CharField(max_length=2)),
                ('zip_code', models.CharField(max_length=5)),
                ('phone', models.CharField(max_length=12)),
                ('website', models.CharField(max_length=512)),
                ('description', models.CharField(max_length=1024)),
                ('verified', models.BooleanField(default=False)),
                ('resource_type', models.CharField(choices=[('HEAL', 'Healthcare'), ('HOUS', 'Housing/Shelter'), ('FOOD', 'Food'), ('EMPL', 'Employment'), ('EDUC', 'Education'), ('UTIL', 'Utility/Financial'), ('TRAN', 'Transportaion'), ('DISA', 'Disability'), ('DOME', 'Domestic Violence')], default='HEAL', max_length=4)),
            ],
        ),
    ]