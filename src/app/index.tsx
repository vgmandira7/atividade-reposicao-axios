import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';


type Post = {
  title: string;
  body: string;
};

export default function ConsumoApiScreen() {
  // Estados para dados, carregamento e erros
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        // Consultando a API usando axios.get
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');

        // Salvando esses dados no estado
        setPost(response.data);
      } catch (err) {
        // Tratando possiveis erros usando try/catch
        console.error("Erro ao buscar dados:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    buscarDados();
  }, []);

  // IF que apresenta uma telinha de carregamento enquanto os dados são buscados
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.textoMensagem}>Carregando dados da API...</Text>
      </View>
    );
  }

  // IF que mostra tela de erro caso ocorra erro na busca dos dados
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.textoErro}>Ops! Ocorreu um erro ao buscar a publicação.</Text>
      </View>
    );
  }

  // Aqui vai exibir o título e o conteúdo (body) que vem da API
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{post?.title}</Text>
      <Text style={styles.conteudo}>{post?.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#F5F6FA',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  conteudo: {
    fontSize: 16,
    color: '#34495E',
    lineHeight: 24,
  },
  textoMensagem: {
    marginTop: 12,
    fontSize: 16,
    color: '#7F8C8D',
  },
  textoErro: {
    fontSize: 16,
    color: '#E74C3C',
    fontWeight: 'bold',
  }
});