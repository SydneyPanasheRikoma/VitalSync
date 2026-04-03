import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Bookmark, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockEducationArticles } from "@/lib/mockData";

const categories = ["All", "Diabetes", "Hypertension", "Post-surgery", "Elderly Care", "Technology"];

const EducationHub = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [articles, setArticles] = useState(mockEducationArticles);

  const filtered = activeCategory === "All" ? articles : articles.filter((a) => a.category === activeCategory);

  const toggleSave = (id: string) => {
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, saved: !a.saved } : a)));
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6 animate-slide-in">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Health Education Hub</h1>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((article) => (
            <div key={article.id} className="glass-card-hover rounded-xl p-5 space-y-3">
              <div className="h-24 rounded-lg bg-gradient-to-br from-primary/10 to-accent flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-primary/40" />
              </div>
              <div>
                <Badge variant="secondary" className="text-[10px] mb-2">{article.category}</Badge>
                <h3 className="text-sm font-semibold">{article.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <Clock className="h-3 w-3" />
                  <span>{article.readTime}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs"
                onClick={() => toggleSave(article.id)}
              >
                <Bookmark className={`h-3 w-3 mr-1 ${article.saved ? "fill-primary text-primary" : ""}`} />
                {article.saved ? "Saved" : "Save"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default EducationHub;
