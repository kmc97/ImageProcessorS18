from pymodm import fields, MongoModel


class User(MongoModel):
    filename = fields.CharField(primary_key=True)
    # because primary_key is True, we will need to query this field using the label _id
    t1 = fields.DateTimeField()
    p_type = fields.CharField()
    proc_dur = fields.IntegerField()
    metrics = fields.ListField()
    base64_image_p = fields.CharField()


def return_entry(filename):
    u = User.objects.raw({"_id": filename}).first()
    return filename, u.t1, u.p_type, u.proc_dur, u.metrics, u.base64_image_p


def add_file(filename, t1, p_type, proc_dur, metrics, base64_image_p):
    u = User(filename, t1, p_type, proc_dur, metrics, base64_image_p)
    u.save()