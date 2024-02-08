# Generated by Django 4.2.6 on 2023-11-01 03:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('name', models.CharField(max_length=50)),
                ('spireId', models.IntegerField(primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=254)),
                ('failedPickupCount', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('orderDateTime', models.DateTimeField()),
                ('paymentType', models.CharField(max_length=20)),
                ('paymentAmt', models.DecimalField(decimal_places=2, max_digits=5)),
                ('itemList', models.TextField()),
                ('spireId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='endpoints.customer')),
            ],
        ),
    ]
