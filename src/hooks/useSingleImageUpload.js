import axios from "axios";
import toast from "react-hot-toast";

const useSingleImageUpload = async e => {
    const loading = toast.loading('Uploading...Please wait!')
    let imageURL = "";
    if (e) {
        const imageData = new FormData();
        imageData.set('key', 'acb2d4c7a68ef1bf06d396d73adb600a')
        imageData.append('image', e);
        console.log("image data", imageData)
        try {
            const res = await axios.post("https://api.imgbb.com/1/upload", imageData);
            imageURL = res.data.data.display_url;
            toast.success('Image Uploaded', {
                id: loading,
            });
        } catch (error) {
            toast.dismiss(loading);
            return toast.error('Failed to upload the image!');
        }
    }
    return imageURL
}

export default useSingleImageUpload;