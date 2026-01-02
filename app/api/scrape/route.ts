import { humanizeText } from "@/app/utils/humanize";
import axios from "axios";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  try {
    const response = await axios.get(url as string, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Wind64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    const html = await response.data;

    // parse with cheerio api
    const $ = cheerio.load(html);
    const paragraphs: string[] = []; // data type is array of string

    // get the data
    $("p").each((_i, el) => {
      const text = $(el)
        .clone()
        .find("sup, script, style")
        .remove()
        .end()
        .text()
        .replace(/\[\d+\]/g, "") // remove [1], [2]
        .replace(/\s+/g, " ")
        .trim();
      if (text) paragraphs.push(text);
    });

    // join into one big text
    const rawText = paragraphs.join(" ");
    const humanize = humanizeText(rawText);

    return NextResponse.json({ essay: humanize });
  } catch (error) {
    return NextResponse.json({ error: "Failed to Scrape" }, { status: 502 });
  }
}
