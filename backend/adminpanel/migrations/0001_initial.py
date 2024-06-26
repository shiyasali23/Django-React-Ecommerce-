# Generated by Django 5.0.4 on 2024-04-14 10:23

import django.db.models.deletion
import shortuuid.main
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True)),
                ('body', models.TextField(max_length=2000)),
                ('phone_number', models.IntegerField(blank=True, null=True)),
                ('to', models.CharField(blank=True, choices=[('all', 'ALL'), ('admin', 'ADMIN'), ('customer', 'CUSTOMER')], max_length=8, null=True)),
                ('seen', models.BooleanField(blank=True, default=False, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-created'],
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=25, unique=True)),
                ('description', models.TextField(max_length=2000)),
                ('price', models.DecimalField(decimal_places=1, max_digits=10)),
                ('category', models.CharField(choices=[('Shirt', 'Shirt'), ('T-Shirt', 'T-Shirt'), ('Pants', 'Pants')], max_length=10)),
                ('tag', models.CharField(choices=[('None', 'None'), ('Featured', 'Featured'), ('New Arrival', 'New Arrival')], max_length=11, null=True)),
                ('vote', models.IntegerField(blank=True, default=0, null=True)),
                ('total_sold', models.IntegerField(blank=True, default=0, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('out_of_stock', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['-total_sold'],
            },
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True)),
                ('main_image', models.ImageField(upload_to='')),
                ('sub_image_1', models.ImageField(upload_to='')),
                ('sub_image_2', models.ImageField(upload_to='')),
                ('sub_image_3', models.ImageField(upload_to='')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('product', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='adminpanel.product')),
            ],
        ),
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id', models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True)),
                ('stock_S', models.IntegerField(default=0)),
                ('stock_M', models.IntegerField(default=0)),
                ('stock_L', models.IntegerField(default=0)),
                ('stock_XL', models.IntegerField(default=0)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('product', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='stock', to='adminpanel.product')),
            ],
        ),
    ]
