import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const TermsConditionsPage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Terms and Conditions" },
  ];

  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        <Breadcrumbs items={breadcrumbItems} />
        
        <h1 className="text-3xl md:text-4xl font-display font-bold mt-6 mb-8">Terms and Conditions</h1>
        
        <div className="prose prose-sm md:prose-base max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Use of Website</h2>
            <p className="text-muted-foreground">
              You agree to use this website for lawful purposes only. You must not use this website to engage in any fraudulent activity or to violate any laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Product Information</h2>
            <p className="text-muted-foreground">
              We strive to display product colors and images as accurately as possible. However, actual colors may vary slightly due to monitor settings and photography.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Pricing</h2>
            <p className="text-muted-foreground">
              All prices are listed in Indian Rupees (INR). We reserve the right to change prices at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content on this website, including text, graphics, logos, and images, is the property of Gangster and is protected by copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              We shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TermsConditionsPage;
