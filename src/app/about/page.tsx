import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">

      {/* Main Content */}
        <main className="flex flex-col md:flex-row gap-4 md:gap-20 p-6 md:p-20 items-start max-w-6xl w-full">
        <div className="max-w-xl space-y-4">
          <h1 className="text-2xl font-bold">About</h1>
          <p>
            Welcome to Minikaniko, your ultimate destination for exclusive shopping! We are passionate
            about bringing you the best deals and a seamless shopping experience.
          </p>

          <h1 className="text-2xl font-bold">What we offer</h1>
          <p>
            From stylish apparel to electronics, every item in our store is carefully selected to
            ensure quality and affordability.
          </p>

          <h1 className="text-2xl font-bold">Why Choose Us?</h1>
          <ul className="list-disc list-inside space-y-1">
            <li>Authentic Products: Only verified and trusted sources.</li>
            <li>Great Deals: Frequent discounts and promotions.</li>
            <li>Community Focused: Customer satisfaction is our priority.</li>
          </ul>

          <h1 className="text-2xl font-bold">Contact Us</h1>
          <ul className="list-disc list-inside space-y-1">
            <li>📧 minikanikoburgerstation@gmail</li>
            <li>📞 Telephone 09999938055</li>
            <li>
              🌐{' '}
              <a
                href="https://www.facebook.com/profile.php?id=100075827272564"
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                Minikaniko Burger Station - Mauban Branch
              </a>
            </li>
            <li>
              🌐{' '}
              <a
                href="https://www.facebook.com/profile.php?id=100083049406555"
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                Minikaniko Burger Station - Pagbilao Branch
              </a>
            </li>
            <li>
              🌐{' '}
              <a
                href="https://www.facebook.com/profile.php?id=100085304899233"
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                Minikaniko Burger Station - Lucena Branch 
              </a>
            </li>
            <li>
              🌐{' '}
              <a
                href="https://www.facebook.com/profile.php?id=61559769086139"
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                Minikaniko Burger Station - San Pablo Branch 
              </a>
            </li>
          </ul>
        </div>

        {/* Owner Image */}
        <div className="shrink-0">
          <Image
            src="/assets/owner.jpg" // This image must exist in public/assets/
            alt="Owner"
            width={250}
            height={300}
            className="rounded-lg object-cover"
          />
        </div>
      </main>
    </div>
  );
}
