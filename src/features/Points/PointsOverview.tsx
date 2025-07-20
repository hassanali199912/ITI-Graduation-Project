import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

export default function OffersPage() {
  const handlePurchase = async (pointsAmount: number) => {
    try {
      const response = await fetch(
        "http://academix1.runasp.net/api/payments/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pointsAmount: pointsAmount,
            pointPrice: 1,
            currency: "",
            description: "",
            reference: "",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("فشل في إنشاء الطلب");
      }

      const data = await response.json();

      if (data?.paymentUrl) {
        window.open(data.paymentUrl, "_blank");
      } else {
        alert("الرابط غير موجود في الاستجابة");
      }
    } catch (error) {
      console.error("حدث خطأ:", error);
      alert("حدث خطأ أثناء تنفيذ الطلب");
    }
  };

  const offers = [
    { id: 1, title: "اشترِ 10 نقاط", points: 10, price: 1 },
    { id: 2, title: "اشترِ 25 نقطة", points: 25, price: 2.3 },
    { id: 3, title: "اشترِ 50 نقطة", points: 50, price: 4.5 },
  ];

  return (
    <div dir="rtl" className="max-w-5xl mx-auto p-6">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        className="text-indigo-600 font-bold"
      >
        خطط شراء النقاط
      </Typography>

      <Typography
        variant="body1"
        align="center"
        className="text-gray-600 mb-10"
      >
        استخدم النقاط لحجز جلسات إرشادية، بعض الجلسات مجانية والبعض الآخر يتطلب
        عددًا من النقاط. يمكنك شراء ما يناسبك من العروض أدناه.
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-20">
        {offers.map((offer) => (
          <Card
            key={offer.id}
            className="shadow-lg hover:shadow-xl transition duration-300"
            sx={{ borderRadius: "16px" }}
          >
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                {offer.title}
              </Typography>

              <Typography variant="body2" color="textSecondary">
                عدد النقاط: <strong>{offer.points}</strong>
              </Typography>

              <Typography variant="body2" color="textSecondary">
                السعر: <strong>${offer.price.toFixed(2)}</strong>
              </Typography>
            </CardContent>

            <CardActions className="px-4 pb-4">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handlePurchase(offer.points)}
              >
                شراء الآن
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>

      <Typography
        variant="caption"
        align="center"
        className="text-gray-500 block mt-10"
      >
        النقاط غير قابلة للتحويل وتُستخدم فقط داخل المنصة.
      </Typography>
    </div>
  );
}
