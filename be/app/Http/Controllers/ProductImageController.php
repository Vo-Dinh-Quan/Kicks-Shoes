<?php

namespace App\Http\Controllers;

use App\Models\ProductImage;
use Cloudinary\Api\Upload\UploadApi;
use Cloudinary\Configuration\Configuration;
use Illuminate\Http\Request;

class ProductImageController extends Controller
{
    public static function upload($image, $id){
        Configuration::instance('cloudinary://' . config('services.cloudinary.api_key') . ':' . config('services.cloudinary.api_secret') . '@' . config('services.cloudinary.cloud_name') . '?secure=true');

        // Xoa anh
        $uploadApi = new UploadApi();
        $uploadResult = $uploadApi->upload($image, [
            'folder' => 'home',
        ]);

        $productImage = new  ProductImage();
        $productImage->product_id = $id;
        $productImage->public_id = $uploadResult['public_id'];
        $productImage->image = $uploadResult['secure_url'];
        $productImage->save();
    }

    public static function delete($publicId){
        if(substr($publicId, 0, 5) !== "home/"){
            $publicId = "home/".$publicId;
        }

        Configuration::instance('cloudinary://' . config('services.cloudinary.api_key') . ':' . config('services.cloudinary.api_secret') . '@' . config('services.cloudinary.cloud_name') . '?secure=true');

        $uploadApi = new UploadApi();

        $uploadApi->destroy($publicId);

        $image = ProductImage::where('public_id', $publicId);
        $image->delete();
    }

    public function update(){
        
    }
}
