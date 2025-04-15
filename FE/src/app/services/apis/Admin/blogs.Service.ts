const API_BASE = "http://localhost:3000/api"; // hoặc URL backend thực tế

export interface Blog {
    id?: number;
    userId: number;
    title: string;
    content: string;
    image?: string;
    createAt?: string;
}

const blogsService = {
    async getAll(): Promise<Blog[]> {
        const response = await fetch(`${API_BASE}/blogs/list`);
        const data = await response.json();
        return data.data;
    },

    async getById(id: number): Promise<Blog> {
        const response = await fetch(`${API_BASE}/blogs/getById/${id}`);
        const data = await response.json();
        return data.data;
    },

    async create(blog: Blog): Promise<Blog> {
        const response = await fetch(`${API_BASE}/blogs/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blog),
        });
        const data = await response.json();
        return data.data;
    },

    async update(id: number, blog: Partial<Blog>): Promise<Blog> {
        const response = await fetch(`${API_BASE}/blogs/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blog),
        });
        const data = await response.json();
        return data.data;
    },

    async delete(id: number): Promise<Blog> {
        const response = await fetch(`${API_BASE}/blogs/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data.data;
    },
};

export default blogsService;
