import { PrismicRichText } from "@prismicio/react";
import { asLink } from "@prismicio/client";

import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import { createClient } from "@/prismicio";

export default async function ServicesPage() {
  const client = createClient();
  const page = await client.getSingle("services");

  const ctaHref = asLink(page.data.cta_link) || "mailto:hello@tritone.com";

  return (
    <main className="min-h-screen text-white">
      <section className="pt-[112px] md:pt-[150px]">
        <Container>
          <Grid className="items-start gap-y-[56px]">
            <div className="col-span-2 md:sticky md:top-[150px] md:col-span-5 md:self-start">
              <h1 className="font-founders text-[30px] leading-[1.18] tracking-[-0.02em] md:text-[42px] md:leading-[1.16]">
                {page.data.heading}
              </h1>

              <a
                href={ctaHref}
                className="mt-[44px] inline-flex h-[52px] items-center justify-center bg-[#2917E8] px-[30px] font-mono text-[10pt] tracking-[0.02em] text-white transition-opacity hover:opacity-90"
              >
                {page.data.cta_label || "Contact Us"}
              </a>
            </div>

            <div className="col-span-2 md:col-span-5 md:col-start-8">
              <div className="space-y-[40px] pb-[50px] font-mono text-[10px] leading-[1.6] tracking-[0.08em] md:text-[12px] md:pb-[140px]">
                <PrismicRichText
                  field={page.data.body}
                  components={{
                    heading3: ({ children }) => (
                      <h3 className="mb-[24px] font-founders text-[26px] leading-[1.1] tracking-[-0.02em] md:text-[32px]">
                        {children}
                      </h3>
                    ),
                    paragraph: ({ children }) => <p>{children}</p>,
                    list: ({ children }) => (
                      <ul className="list-disc space-y-[10px] pl-[38px]">
                        {children}
                      </ul>
                    ),
                    listItem: ({ children }) => <li>{children}</li>,
                  }}
                />

                <a
                  href={ctaHref}
                  className="inline-flex h-[44px] items-center justify-center bg-[#2917E8] px-[42px] font-mono text-[12px] tracking-[0.14em] text-white md:hidden"
                >
                  {page.data.cta_label || "Contact Us"}
                </a>
              </div>
            </div>
          </Grid>
        </Container>
      </section>
    </main>
  );
}