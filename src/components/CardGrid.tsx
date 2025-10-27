import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface CardItem {
  title: string;
  description: string;
  icon?: LucideIcon;
  content?: ReactNode;
}

interface CardGridProps {
  title?: string;
  description?: string;
  items: CardItem[];
  columns?: 2 | 3 | 4;
}

const CardGrid = ({ title, description, items, columns = 3 }: CardGridProps) => {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        {(title || description) && (
          <div className="text-center mb-12 max-w-3xl mx-auto">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
          {items.map((item, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 animate-fade-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                {item.icon && (
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                    <item.icon className="w-7 h-7 text-primary group-hover:text-cobalt-light transition-colors" />
                  </div>
                )}
                <CardTitle className="text-foreground">{item.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {item.description}
                </CardDescription>
              </CardHeader>
              {item.content && <CardContent>{item.content}</CardContent>}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardGrid;
