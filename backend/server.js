require("dotenv").config();
const express=require("express");
const app=express();
const connectToDB=require("./database/db")
const authRoutes=require("../backend/routes/auth")
const notesRoutes=require("./routes/notes")
const path=require("path")


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "dist", "index.html")
    );
  });
}

connectToDB()
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/notes",notesRoutes)
const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})