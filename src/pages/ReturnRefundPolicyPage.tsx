import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const ReturnRefundPolicyPage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Return & Refund Policy" },
  ];

  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        <Breadcrumbs items={breadcrumbItems} />
        
        <h1 className="text-3xl md:text-4xl font-display font-bold mt-6 mb-8">Return & Refund Policy</h1>
        
        <div className="prose prose-sm md:prose-base max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Return Policy</h2>
            <p className="text-muted-foreground">
              We accept returns within 7 days of delivery. Items must be unused, unwashed, and in their original packaging with all tags attached.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How to Return</h2>
            <p className="text-muted-foreground">
              To initiate a return, please contact our customer service team at lovegangster@gmail.com with your order number and reason for return.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Refund Process</h2>
            <p className="text-muted-foreground">
              Once we receive your returned item, we will inspect it and notify you of the refund status. Approved refunds will be processed within 5-7 business days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Non-Returnable Items</h2>
            <p className="text-muted-foreground">
              Items on sale, undergarments, and customized products cannot be returned or exchanged.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Exchange Policy</h2>
            <p className="text-muted-foreground">
              We offer free exchanges for size issues. Contact us within 7 days of delivery to request an exchange.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ReturnRefundPolicyPage;
