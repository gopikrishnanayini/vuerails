<template>
  <div>
    <b-breadcrumb :items="items" />
    <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        indicators
        img-width="1024"
        img-height="480"
      >
        <b-carousel-slide caption="First slide" img-src="https://picsum.photos/1024/480/?image=10" />
        <b-carousel-slide caption="Second Slide" img-src="https://picsum.photos/1024/480/?image=12" />
        <b-carousel-slide caption="Third Slide" img-src="https://picsum.photos/1024/480/?image=22" />
      </b-carousel>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {
            text: 'Teacher',
            href: '/teachers'
          },
          {
            text: 'Sign Up',
            href: '/users/sign_up'
          },
          {
            text: 'Login',
            href: '/users/sign_in'
          },
          {
            text: 'Home',
            href: '/'
          }
        ]
      }
    }
  }
</script>
