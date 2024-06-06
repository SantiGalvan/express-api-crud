const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const slugify = require("slugify");

const store = async (req, res) => {
    const { title, content } = req.body;

    const slug = slugify(title);

    const data = {
        title,
        slug,
        image: req.body.image ? req.body.image : '',
        content,
        published: req.body.published ? true : false
    }

    try {
        const post = await prisma.post.create({ data });
        res.status(200).send(post);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const index = async (req, res) => {
    try {
        // Filtri
        const where = {};
        const { published, text } = req.query;

        if (text) {
            where.OR = [
                { content: { contains: text } },
                { title: { contains: text } }
            ]
        }

        if (published === 'true') {
            where.published = true;
        } else if (published === 'false') {
            where.published = false;
        }

        const posts = await prisma.post.findMany({ where });
        res.json(posts);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const show = async (req, res) => {
    try {
        const { slug } = req.params;

        const post = await prisma.post.findUnique({
            where: { slug }
        });

        if (post) {
            res.json(post)
        } else {
            throw new Error(`Pizza con slug:${slug} non trovata`);
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = { store, index, show }