<template>
  <div>
    <div class="js-canvas-box" style="height: 100px" >
      <canvas ref="signatureCanvas" id="myCanvas" width="380" height="100" style="border:1px solid #000000;">
      </canvas>
    </div>
    <div class="signer-footer pull-left mb-0" style="width:380px;margin:5px 0;padding:0;">
      <a class="js-import-sign pull-left cursor-pointer" @click="uploadFile"><span class="color-flock link-hover-underline">Upload existing signature</span></a>
      <input type="file" id="file" ref="file" accept="image/*" v-show="false" v-on:change="uploading()"/>
      <a class="clear-signature pull-right cursor-pointer color-danger" @click="clearSignature"><span class="link-hover-underline underline-danger">Clear</span></a>
    </div>
    <div v-if="v.$error" class="d-inline-block form-group-error">
      <span v-if="v.required==false" class="form-group-message">Field is required</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SignatureInput',
    props: {
      signature: {
        type: String,
        default: ""
      },
      v: {
        type: Object,
        default: function() {
          return {};
        }
      }
    },
    data() {
      return {
        uploadedsign: '',
        first_fabric: true,
        canvasSign: new fabric.Canvas('myCanvas')
      }
    },
    methods: {
      uploadFile(){
        this.$refs.file.click()
      },
      uploading(){
        var file = this.$refs.file.files[0]
        var self = this
        var imgReader = new FileReader();
        if (!file.type.match('image.*')) {
          this.$toasted.error("File should be of image format.")
          return false
        } else if (file.size > 228385) {
          this.$toasted.error("File should be smaller than 2 MB.")
          return false
        }
        imgReader.readAsDataURL(file);
        imgReader.onload = function () {
          self.clearSignature()
          self.drawImage(imgReader.result);
          self.$emit('signatureChanged',imgReader.result);
         };
         imgReader.onerror = function (error) {
           console.log('Error: ', error);
         };
      },
      drawImage(val){
        let canvas = this.$refs.signatureCanvas
        let graphics = canvas.getContext("2d");
        let img = new Image();
        img.onload = function() {
          var hRatio = canvas.width  / img.width ;
          var vRatio =  canvas.height / img.height ;
          var ratio  = Math.min ( hRatio, vRatio );
          var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
          var centerShift_y = ( canvas.height - img.height*ratio ) / 2;
          graphics.clearRect(0,0,canvas.width, canvas.height);
          graphics.drawImage(img, 0,0, img.width, img.height,centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);
        }
        img.src = val;
      },
      clearSignature(){
        this.$emit('signatureChanged','');
        this.canvasSign.clear()
        this.drawImage('')
        this.drawSignature()
      },
      drawSignature(){
        var canvas = this.$refs.signatureCanvas
        var graphics = canvas.getContext("2d");
        this.canvasSign = this.canvasSign || new fabric.Canvas('myCanvas')
        this.canvasSign.clearContext(graphics);
        if(this.first_fabric){
          this.canvasSign = new fabric.Canvas('myCanvas')
          this.first_fabric = false
        }
        this.canvasSign.isDrawingMode = true
        this.canvasSign.freeDrawingBrush.width = 3;
        this.canvasSign.freeDrawingBrush.color = 'black';
        let self = this;
        this.canvasSign.on('mouse:down', function(event) {
          document.body.addEventListener('touchmove', self.preventEvent, { passive: false });
        });
        this.canvasSign.on('path:created', function(event){
          document.body.removeEventListener('touchmove', self.preventEvent, { passive: false });
          self.$emit('signatureChanged',self.$refs.signatureCanvas.toDataURL());
        });
      }
    },
    mounted(){
      if(this.signature != null){
        this.drawImage(this.signature)
      } else {
        this.clearSignature()
      }
    }
  }
</script>
