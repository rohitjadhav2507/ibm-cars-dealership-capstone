from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import CarMake, CarModel
import json


class CarModelTestCase(TestCase):
    def setUp(self):
        self.make = CarMake.objects.create(
            name="Toyota",
            description="Japanese automotive manufacturer"
        )
        self.car_model = CarModel.objects.create(
            car_make=self.make,
            name="Camry",
            type="SEDAN",
            year=2023
        )

    def test_car_make_creation(self):
        self.assertEqual(self.make.name, "Toyota")
        self.assertEqual(str(self.make), "Toyota")

    def test_car_model_creation(self):
        self.assertEqual(self.car_model.name, "Camry")
        self.assertEqual(self.car_model.type, "SEDAN")
        self.assertEqual(self.car_model.year, 2023)
        self.assertEqual(self.car_model.car_make, self.make)
        self.assertIn("Camry", str(self.car_model))


class DjangoAppViewsTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username="testuser",
            password="testpassword123",
            first_name="Test",
            last_name="User",
            email="testuser@example.com"
        )
        self.make = CarMake.objects.create(
            name="Mercedes",
            description="German luxury vehicles"
        )
        self.model = CarModel.objects.create(
            car_make=self.make,
            name="C-Class",
            type="SEDAN",
            year=2023
        )

    def test_get_cars_endpoint(self):
        response = self.client.get('/djangoapp/get_cars')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertIn("CarModels", data)
        self.assertTrue(len(data["CarModels"]) > 0)
        car_found = any(c["CarModel"] == "C-Class" for c in data["CarModels"])
        self.assertTrue(car_found)

    def test_login_user_valid(self):
        login_data = {
            "userName": "testuser",
            "password": "testpassword123"
        }
        response = self.client.post(
            '/djangoapp/login',
            data=json.dumps(login_data),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data.get("userName"), "testuser")
        self.assertEqual(data.get("status"), "Authenticated")

    def test_login_user_invalid(self):
        login_data = {
            "userName": "testuser",
            "password": "wrongpassword"
        }
        response = self.client.post(
            '/djangoapp/login',
            data=json.dumps(login_data),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertNotIn("status", data)

    def test_logout_user(self):
        response = self.client.get('/djangoapp/logout')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data.get("userName"), "")

    def test_registration_success(self):
        reg_data = {
            "userName": "newuser456",
            "password": "newpassword456",
            "firstName": "New",
            "lastName": "User",
            "email": "newuser@example.com"
        }
        response = self.client.post(
            '/djangoapp/register',
            data=json.dumps(reg_data),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data.get("userName"), "newuser456")
        self.assertEqual(data.get("status"), "Authenticated")

    def test_registration_already_exists(self):
        reg_data = {
            "userName": "testuser",
            "password": "testpassword123",
            "firstName": "Test",
            "lastName": "User",
            "email": "testuser@example.com"
        }
        response = self.client.post(
            '/djangoapp/register',
            data=json.dumps(reg_data),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data.get("error"), "Already Registered")
