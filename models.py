from pymodm import fields, MongoModel


class User(MongoModel):
    name = fields.CharField(primary_key=True) # because primary_key is True, we will need to query this field using the label _id
    base64_image = fields.CharField()