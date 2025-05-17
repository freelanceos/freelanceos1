const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "أحمد محمد",
      role: "مطور ويب",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80",
      rating: 5,
      comment: "كتاب تعلم جافاسكريبت من الصفر إلى الاحتراف هو أفضل استثمار قمت به لتطوير مهاراتي. الشرح واضح والأمثلة عملية، وساعدني في الحصول على وظيفة جديدة!"
    },
    {
      id: 2,
      name: "سارة أحمد",
      role: "مصممة جرافيك",
      avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80",
      rating: 4.5,
      comment: "قوالب وسائل التواصل الاجتماعي وفرت علي الكثير من الوقت والجهد. التصميمات عصرية واحترافية، وسهلة التخصيص. أنصح بها لكل مصمم ومسوق رقمي!"
    },
    {
      id: 3,
      name: "خالد عبدالله",
      role: "رائد أعمال",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80",
      rating: 5,
      comment: "قالب المتجر الإلكتروني كان نقطة انطلاق مثالية لمشروعي. سهل التخصيص، واحترافي، وسريع. تمكنت من إطلاق متجري خلال أسبوع فقط بفضل هذا القالب الرائع!"
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    
    return stars;
  };

  return (
    <section className="py-12 bg-neutral-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-neutral-800 mb-10 text-center">آراء العملاء</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover" 
                />
                <div className="mr-4">
                  <h4 className="font-bold text-neutral-800">{testimonial.name}</h4>
                  <p className="text-neutral-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="text-yellow-500 flex mb-3">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-neutral-700">{testimonial.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
