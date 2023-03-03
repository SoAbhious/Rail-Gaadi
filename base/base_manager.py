from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response

from api.serializers import TrainStatusSerializer
from base.models import Admin, User, Helper, TrainStatus


@csrf_exempt
def admin_login(request):
    username = request.POST['username']
    password = request.POST['password']
    try:
        adminData = Admin.objects.get(username=username, password=password)
    except ObjectDoesNotExist:
        adminData = None
    if adminData:
        return JsonResponse({'bool': True, 'id': adminData.id})
    else:
        return JsonResponse({'bool': False, 'msg': "Invalid username or password!!"})


@csrf_exempt
def user_login(request):
    username = request.POST['username']
    password = request.POST['password']
    try:
        userData = User.objects.get(username=username, password=password)
    except ObjectDoesNotExist:
        userData = None
    if userData:
        if not userData.verify_status:
            return JsonResponse({'bool': False, 'msg': "Account not verified!!"})
        else:
            return JsonResponse({'bool': True, 'id': userData.id})
    else:
        return JsonResponse({'bool': False, 'msg': "Invalid username or password!!"})


@csrf_exempt
def verify_user(request, id):
    otp_digit = request.POST.get('otp_digit')
    user = User.objects.filter(id=id, otp_digit=otp_digit).first()
    if user:
        User.objects.filter(id=id, otp_digit=otp_digit).update(verify_status=True)
        return JsonResponse({'bool': True, 'id': user.id})
    else:
        return JsonResponse({'bool': False})


def func(source, destination, date):
    sourceRoutes = Helper.objects.filter(station=source)
    destRoutes = Helper.objects.filter(station=destination)
    sourceRoutes = [train for train in sourceRoutes if train.route in (route.route for route in destRoutes)]
    for train in sourceRoutes:
        for route in destRoutes:
            if train.route == route.route:
                train.diff = route.number - train.number
                break
    trainStatus = TrainStatus.objects.filter(date=date)
    trains = [source for source in trainStatus if source.route in (route.route for route in sourceRoutes)]
    for train in trains:
        for route in sourceRoutes:
            if train.route == route.route:
                train.stations = route.diff
                break
    serializer = TrainStatusSerializer(trains, many=True)
    return Response(serializer.data)